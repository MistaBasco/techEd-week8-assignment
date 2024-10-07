import ReviewCard from "@/components/ReviewCard";
import styles1 from "@/app/user/[id]/UserDetailsPage.module.css";
import styles2 from "@/app/page.module.css";

export default async function UserDetailsPage({ params }) {
  const { id } = params;
  const current_user = 1;
  try {
    // Fetch the user details and reviews from the API route
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`
    );

    if (!response.ok) {
      console.error("Failed to fetch user details:", response.statusText);
      return <h2>User not found or failed to fetch user details.</h2>;
    }

    const data = await response.json();

    const { user, reviews } = data;
    // console.log(data);

    return (
      <div className={`${styles2.page} ${styles1.UserDetailsPage}`}>
        <div className={styles1.UserContainer}>
          <h1 className={styles1.UserTitle}>{user.username}</h1>
          <p className={styles2.spacer}>
            <strong>Email:</strong> {user.email}
          </p>
          <p className={styles2.spacer}>
            <strong>Member since:</strong>
            {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className={styles1.ReviewContainer}>
          <h1>Reviews by {user.username}</h1>
          <div className={styles1.Reviews}>
            {reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              reviews.map((review) => (
                <ReviewCard
                  key={review.review_id}
                  review={review}
                  current_user={current_user}
                />
              ))
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching user details:", error);
    return <h2>Error fetching user details.</h2>;
  }
}
