import React, { useEffect, useState } from "react";
import Layout from "../web/Layout";
import styles from "../web/styles.module.css";

const StagingUIDsPage = () => {
  const [uids, setUids] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/show_uids")
      .then((res) => res.json())
      .then((data) => {
        setUids(data.uids || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load UIDs");
        setLoading(false);
      });
  }, []);

  return (
    <Layout title="Collected UIDs">
      <h2 className={styles.center}>Slack User IDs (DM senders)</h2>
      {loading ? (
        <p className={styles.center}>Loading...</p>
      ) : error ? (
        <p className={styles.center} style={{ color: "red" }}>{error}</p>
      ) : uids.length === 0 ? (
        <p className={styles.center}>No UIDs collected yet.</p>
      ) : (
        <ul className={styles.center}>
          {uids.map((uid) => (
            <li key={uid} style={{ fontFamily: "monospace" }}>{uid}</li>
          ))}
        </ul>
      )}
    </Layout>
  );
};

export default StagingUIDsPage;