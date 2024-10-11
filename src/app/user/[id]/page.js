import ReviewCard from "@/components/ReviewCard";
import FollowButton from "@/components/FollowButton";
import styles1 from "@/app/user/[id]/UserDetailsPage.module.css";
import styles2 from "@/app/page.module.css";
import { auth } from "@clerk/nextjs/server";
import { getUserIdByClerkId } from "@/utilities/getUserByClerkId";

export default async function UserDetailsPage({ params }) {
  const { id } = params;
  let userId;

  try {
    const { userId: clerkId } = auth();

    if (clerkId) {
      // Convert Clerk ID to local user ID
      userId = await getUserIdByClerkId(clerkId);
      if (!userId) {
        return <h2>User not found</h2>;
      }
    }

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
    const same_user = parseInt(id) === parseInt(userId);

    let feedReviews = [];
    if (same_user) {
      const feedResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}/feed`
      );

      if (feedResponse.ok) {
        feedReviews = await feedResponse.json();
      } else {
        console.error("Failed to fetch user feed:", feedResponse.statusText);
      }
    }

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
          {userId && !same_user && (
            <FollowButton current_user={userId} user_id={id} />
          )}
        </div>

        {same_user && (
          <div className={styles1.FeedContainer}>
            <h1 className={styles1.FixedFeedLabel}>Your Feed</h1>
            <div className={styles1.Reviews}>
              {feedReviews.length === 0 ? (
                <p>No reviews in your feed yet.</p>
              ) : (
                feedReviews.map((review) => (
                  <ReviewCard
                    key={review.review_id}
                    review={review}
                    current_user={userId}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {!same_user && (
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
                    current_user={userId}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching user details:", error);
    return <h2>Error fetching user details.</h2>;
  }
}
