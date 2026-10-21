import { useEffect, useState } from "react";

export default function BackendHealth() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
   const apiUrl = "/bhimabe/api/health";

    console.log("Calling Backend API:", apiUrl);

    fetch(apiUrl)
      .then((response) => {
        console.log("Response Status:", response.status);
        console.log("Response OK:", response.ok);

        if (!response.ok) {
          throw new Error("Backend request failed");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Backend Health Response:", data);
        console.log("Status:", data.status);
        console.log("Application:", data.application);
        console.log("Message:", data.message);

        setHealth(data);
      })
      .catch((err) => {
        console.error("Backend API Error:", err);
        setError(err.message);
      });
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={styles.header}>
          <div style={styles.statusIcon}>✓</div>

          <div>
            <h1 style={styles.title}>BHIMA Backend</h1>
            <p style={styles.subtitle}>Backend Health Status</p>
          </div>
        </div>

        {health && (
          <div style={styles.details}>

            <div style={styles.row}>
              <span style={styles.label}>Status</span>
              <strong style={styles.status}>
                {health.status}
              </strong>
            </div>

            <div style={styles.row}>
              <span style={styles.label}>Application</span>
              <strong style={styles.value}>
                {health.application}
              </strong>
            </div>

            <div style={styles.row}>
              <span style={styles.label}>Message</span>
              <strong style={styles.value}>
                {health.message}
              </strong>
            </div>

          </div>
        )}

        {error && (
          <div style={styles.error}>
            <span>✕</span>
            <span>{error}</span>
          </div>
        )}

        {!health && !error && (
          <div style={styles.loading}>
            Checking backend status...
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background: "#f5f7fa",
  },

  card: {
    width: "100%",
    maxWidth: "550px",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    paddingBottom: "24px",
    borderBottom: "1px solid #e5e7eb",
  },

  statusIcon: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#dcfce7",
    color: "#16a34a",
    fontSize: "24px",
    fontWeight: "700",
  },

  title: {
    margin: 0,
    fontSize: "24px",
    color: "#111827",
  },

  subtitle: {
    margin: "5px 0 0",
    color: "#6b7280",
    fontSize: "14px",
  },

  details: {
    marginTop: "24px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "16px 0",
    borderBottom: "1px solid #f0f0f0",
  },

  label: {
    color: "#6b7280",
    fontSize: "15px",
  },

  value: {
    color: "#111827",
    fontSize: "15px",
    textAlign: "right",
  },

  status: {
    color: "#16a34a",
    background: "#dcfce7",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "14px",
  },

  error: {
    marginTop: "24px",
    padding: "14px 16px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    borderRadius: "10px",
    background: "#fee2e2",
    color: "#b91c1c",
    fontSize: "14px",
  },

  loading: {
    marginTop: "24px",
    textAlign: "center",
    color: "#6b7280",
    fontSize: "14px",
  },
};