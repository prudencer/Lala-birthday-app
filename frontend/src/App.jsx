import { useEffect, useState } from "react";
import { createMessage, getMessages } from "./services/api";
import "./index.css";

function App() {
  const NORMAL_PASSWORD = "lame";
  const SPECIAL_PASSWORD = "prudence0329";
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [birthdayMessages, setBirthdayMessages] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSpecialTab, setShowSpecialTab] = useState(false);
  const [activeTab, setActiveTab] = useState("memories");

  const [error, setError] = useState("");
  const [messageStatus, setMessageStatus] = useState("");

  const photos = [
    {
      image: "/images/photo1.jpg",
      message: "To many more smiles, memories, and beautiful moments."
    },
    {
      image: "/images/photo2.jpg",
      message: "You bring joy, laughter, and light everywhere you go."
    },
    {
      image: "/images/photo3.jpg",
      message: "30+ looks amazing on you, Lala 😅"
    },
    {
      image: "/images/photo4.jpg",
      message: "Wishing you love, peace, happiness, and endless blessings."
    },
    {
      image: "/images/photo5.jpg",
      message: "Today is all about celebrating you. Happy birthday!"
    }
  ];

  useEffect(() => {
    async function loadMessages() {
      try {
        const data = await getMessages();
        setBirthdayMessages(data);
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    }

    if (isLoggedIn) {
      loadMessages();
    }
  }, [isLoggedIn]);

  function handleLogin(e) {
    e.preventDefault();
    
    if (username.trim().toLowerCase() !== "lame") {
      setError("Incorrect username.");
      return;
    }

    if (password.trim().toLowerCase() === NORMAL_PASSWORD.toLowerCase()) {
      setIsLoggedIn(true);
      setShowSpecialTab(false);
      setActiveTab("memories");
      setShowWelcomeModal(true);
      setError("");
      return;
    }

    if (password === SPECIAL_PASSWORD) {
      setIsLoggedIn(true);
      setShowSpecialTab(true);
      setActiveTab("memories");
      setError("");
      return;
    }

    setError("Incorrect password.");
  }

  function handleLogout() {
    setUsername("");
    setPassword("");
    setIsLoggedIn(false);
    setShowSpecialTab(false);
    setActiveTab("memories");
    setError("");
  }

  async function handleSubmitBirthdayMessage(e) {
    e.preventDefault();

    if (!guestName.trim() || !guestMessage.trim()) {
      setMessageStatus("Please enter your name and birthday message.");
      return;
    }

    try {
      const savedMessage = await createMessage(guestName, guestMessage);

      setBirthdayMessages([savedMessage, ...birthdayMessages]);
      setGuestName("");
      setGuestMessage("");
      setMessageStatus("Your message has been added.");
    } catch (error) {
      setMessageStatus("Could not save message. Please try again.");
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="login-bg min-vh-100 d-flex align-items-center justify-content-center">
        <div className="card login-card shadow">
          <div className="card-body p-4">
            <h1 className="text-center fw-bold mb-2">Lala&apos;s Birthday </h1>
              <p className="text-center text-muted mb-4">
                Username: lame
                <br />
                Password: lame
              </p>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>

              <button className="btn btn-primary btn-lg w-100">
                Open Surprise
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-bg min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">
            Lala&apos;s Birthday Surprise
          </span>

          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <header className="hero-section text-center text-white">
        <div className="container">
          <h1 className="display-5 fw-bold">Happy 30+ Lala 😅</h1>
          <p className="lead">
            A little surprise filled with love, laughter, and beautiful memories
            to celebrate your special day.
          </p>
        </div>
      </header>

      {showWelcomeModal && (
        <div className="welcome-modal-overlay">
          <div className="welcome-modal-card shadow-lg">
            <h2 className="fw-bold mb-3">
              Welcome 🎉
            </h2>

            <p className="mb-4">
              Please help me wish Lala a happy birthday.
              <br /><br />
               Proceed to leave Lala your birthday message 💖
            </p>

            <button
              className="btn btn-primary px-4"
              onClick={() => setShowWelcomeModal(false)}
            >
              Proceed
            </button>
          </div>
        </div>
      )}

      <main className="container pb-5">
        <section className="birthday-card card shadow-sm">
          <div className="card-body text-center">
            <h2 className="fw-bold mb-3">Happy Birthday Lala 🤩</h2>
            <p className="text-muted">
              May you have many more years, may you continue to be happy and blessed.
            </p>

            <div className="nav nav-pills justify-content-center mt-4 gap-2">
              <button
                className={`nav-link ${activeTab === "memories" ? "active" : ""}`}
                onClick={() => setActiveTab("memories")}
              >
                Memories
              </button>

              {showSpecialTab && (
                <button
                  className={`nav-link ${activeTab === "special" ? "active" : ""}`}
                  onClick={() => setActiveTab("special")}
                >
                  Special Message
                </button>
              )}
            </div>
          </div>
        </section>

        {activeTab === "memories" && (
          <>
          {/* MESSAGE FORM FIRST */}
          <section className="mt-5">
              <div className="card birthday-card shadow-sm">
                <div className="card-body">
                  <h3 className="fw-bold text-center mb-3">
                    Leave a Birthday Message for Lala
                  </h3>

                  {messageStatus && (
                    <div className="alert alert-info">{messageStatus}</div>
                  )}

                  <form onSubmit={handleSubmitBirthdayMessage}>
                    <div className="mb-3">
                      <label className="form-label">Your Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Birthday Message</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        value={guestMessage}
                        onChange={(e) => setGuestMessage(e.target.value)}
                        placeholder="Write your birthday message to Lala"
                      />
                    </div>

                    <button className="btn btn-primary w-100">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </section>

            {/* EXISTING MESSAGES LAST */}
            <section className="mt-5">
              <h3 className="fw-bold text-center mb-4">Messages for Lala</h3>

              {birthdayMessages.length === 0 ? (
                <p className="text-center text-muted">
                  No messages yet. Be the first to leave one.
                </p>
              ) : (
                <div className="row g-4">
                  {birthdayMessages.map((item) => (
                    <div className="col-sm-6 col-lg-4" key={item._id}>
                      <div className="card message-card shadow-sm h-100">
                        <div className="card-body">
                          <h5 className="fw-bold">{item.name}</h5>
                          <p>{item.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* PHOTOS SECOND */}
            <section className="mt-5">
              <div className="row g-4">
                {photos.map((photo, index) => (
                  <div className="col-sm-6 col-md-4" key={index}>
                    <div className="card h-100 birthday-photo-card shadow-sm">
                      <img
                        src={photo.image}
                        alt={`Birthday memory ${index + 1}`}
                        className="card-img-top birthday-image"
                      />

                      <div className="card-body text-center">
                        <h5 className="fw-bold">Memory {index + 1}</h5>
                        <p className="card-text">{photo.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </>
        )}

        {activeTab === "special" && showSpecialTab && (
          <section className="mt-5">
            <div className="card letter-card shadow-sm">
              <div className="card-body p-4 p-md-5">
                <h2 className="fw-bold mb-4">Dear Lala,</h2>

                <p>
                  Happy birthday to someone truly special. Today is not just
                  about adding another year, but about celebrating the beautiful
                  person you are, the joy you bring, and the memories you
                  continue to create.
                </p>

                <p>
                  I hope this new chapter brings you more laughter, peace, love,
                  growth, and blessings than you can imagine. May you always be
                  surrounded by people who appreciate you, celebrate you, and
                  remind you how loved you are.
                </p>

                <p>
                  Thank you for being you. I hope this little surprise makes you
                  smile, because you deserve that and so much more.
                </p>

                <p className="letter-signature">
                  With love,
                  <br />
                  Prudence
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
      <footer className="birthday-footer text-center text-white">
        <div className="container">
          <p className="mb-0">
            For Lala 💖 Happy Birthday — Prudence
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;