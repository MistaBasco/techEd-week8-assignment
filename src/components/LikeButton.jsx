import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@chakra-ui/react";

export default function LikeButton({ reviewId, onLike, liked }) {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleLike = async () => {
    if (!user) {
      alert("You need to log in to like this review!");
      return;
    }

    setLoading(true); // Disable button while waiting for response
    try {
      const response = await fetch(`/api/review/${reviewId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        onLike(); // Update the parent component's state
        // console.log(result.success);
      } else {
        const data = await response.json();
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error liking/unliking review:", error);
    } finally {
      setLoading(false); // Re-enable button after request completes
    }
  };

  return (
    // <button onClick={handleLike} disabled={loading}>
    //   {loading ? "Processing..." : liked ? "Unlike" : "Like"}
    // </button>

    <Button
      onClick={handleLike}
      isLoading={loading}
      loadingText="Processing..."
      isDisabled={loading}
      colorScheme={liked ? "red" : "blue"} // Change color based on like status
    >
      {liked ? "Unlike" : "Like"}
    </Button>
  );
}
