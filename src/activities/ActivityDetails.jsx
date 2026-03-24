import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteActivity, getActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function ActivityDetails() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    const loadActivity = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getActivity(activityId);
        setActivity(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    loadActivity();
  }, [activityId]);

  const handleDelete = async () => {
    setDeleteError(null);

    try {
      await deleteActivity(token, activityId);
      navigate("/activities");
    } catch (e) {
      setDeleteError(e.message);
    }
  };

  if (loading) return <p>Loading activity...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!activity) return <p role="alert">Activity not found.</p>;

  return (
    <>
      <p>
        <Link to="/activities">Back to activities</Link>
      </p>
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
      <p>Created by: {activity.creatorName ?? "Unknown"}</p>
      {token && (
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      )}
      {deleteError && <p role="alert">{deleteError}</p>}
    </>
  );
}
