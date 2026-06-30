import { useState } from "react";

function ShareModal({
    isOpen,
    onClose,
    onShare,
}) {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("editor");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!email.trim()) {
            alert("Please enter an email address.");
            return;
        }

        try {
            setLoading(true);

            await onShare(email.trim(), role);

            setEmail("");
            setRole("editor");

            onClose();
        } catch (error) {
            console.error(error);
            alert("Unable to share file.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    background: "white",
                    padding: "20px",
                    width: "350px",
                    borderRadius: "10px",
                }}
            >
                <h2>Share File</h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        marginBottom: "15px",
                        padding: "8px",
                    }}
                />

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                        width: "100%",
                        marginBottom: "15px",
                        padding: "8px",
                    }}
                >
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                </select>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Sharing..." : "Share"}
                </button>

                <button
                    onClick={onClose}
                    disabled={loading}
                    style={{ marginLeft: "10px" }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default ShareModal;