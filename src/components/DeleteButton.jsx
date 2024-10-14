import { useState } from "react";
import { Button } from "@chakra-ui/react";

export default function DeleteButton({ reviewId, current_user, onDelete }) {
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/review/${reviewId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current_user }),
        credentials: "include",
      });

      if (response.ok) {
        setDeleted(true); // Mark as deleted
        if (onDelete) onDelete(); // Notify parent component
      } else {
        const data = await response.json();
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  if (deleted) {
    return <p>This review has been deleted.</p>;
  }

  return (
    <Button
      onClick={handleDelete}
      isLoading={loading}
      loadingText="Deleting..."
      colorScheme="red"
    >
      Delete
    </Button>
  );
}
