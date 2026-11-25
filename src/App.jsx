import { useState } from 'react';
import Header from './components/Header.jsx';
import BookingForm from './components/BookingForm.jsx';
import './styles.css';

const specials = [
  { name: 'Greek Salad', price: '$12.99', description: 'Crisp greens, olives, feta, and our house lemon dressing.', symbol: '🥗' },
  { name: 'Bruschetta', price: '$8.50', description: 'Grilled bread topped with tomatoes, basil, and olive oil.', symbol: '🍅' },
  { name: 'Lemon Dessert', price: '$6.00', description: 'A bright, refreshing dessert with a little lemon zest.', symbol: '🍋' },
];

export default function App() {
  const [reservation, setReservation] = useState(null);

  function handleBooking(details) {
    setReservation(details);
    window.setTimeout(() => {
      document.getElementById('confirmation')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  function startNewBooking() {
    setReservation(null);
    document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header />
      <main id="main-content">
        <section className="hero" id="home">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">A neighborhood Mediterranean restaurant</p>
              <h1>Little Lemon</h1>
              <h2>Fresh flavors. Memorable moments.</h2>
              <p>Enjoy Mediterranean-inspired food made with fresh ingredients, warm hospitality, and a little zest.</p>
              <a className="button button-primary" href="#reservations">Reserve a Table</a>
            </div>
            <div className="hero-art" role="img" aria-label="Illustration of fresh lemons and Mediterranean ingredients">
              <span aria-hidden="true">🍋</span>
              <span aria-hidden="true">🌿</span>
              <span aria-hidden="true">🍋</span>
            </div>
          </div>
        </section>

        <section className="section specials" id="menu">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Made fresh every day</p>
              <h2>Our favorites</h2>
            </div>
            <a className="text-link" href="#reservations">Book your visit <span aria-hidden="true">→</span></a>
          </div>
          <div className="special-grid">
            {specials.map((item) => (
              <article className="special-card" key={item.name}>
                <div className="special-art" aria-hidden="true">{item.symbol}</div>
                <div className="special-content">
                  <div className="special-title"><h3>{item.name}</h3><strong>{item.price}</strong></div>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="booking-section" id="reservations">
          <div className="booking-layout">
            <div className="booking-intro">
              <p className="eyebrow">We saved you a seat</p>
              <h2>Book a table</h2>
              <p>Choose a date, time, and party size. We'll take care of the rest.</p>
              <ul className="booking-notes">
                <li><span aria-hidden="true">✓</span> Simple, quick reservations</li>
                <li><span aria-hidden="true">✓</span> Instant on-screen confirmation</li>
                <li><span aria-hidden="true">✓</span> A warm welcome awaits</li>
              </ul>
            </div>
            <div className="booking-card">
              {reservation ? (
                <section className="confirmation" id="confirmation" aria-live="polite">
                  <div className="confirmation-icon" aria-hidden="true">✓</div>
                  <p className="eyebrow">You're all set</p>
                  <h2>Reservation confirmed!</h2>
                  <p>Thank you, {reservation.name}. Your booking details are below.</p>
                  <dl className="confirmation-details">
                    <div><dt>Date</dt><dd>{reservation.date}</dd></div>
                    <div><dt>Time</dt><dd>{reservation.time}</dd></div>
                    <div><dt>Guests</dt><dd>{reservation.guests}</dd></div>
                    <div><dt>Email</dt><dd>{reservation.email}</dd></div>
                  </dl>
                  <button className="button button-primary full-width" onClick={startNewBooking}>Make another reservation</button>
                </section>
              ) : (
                <BookingForm onSubmit={handleBooking} />
              )}
            </div>
          </div>
        </section>

        <section className="about-section section" id="about">
          <p className="eyebrow">Our story</p>
          <h2>Good food brings people together.</h2>
          <p>Little Lemon is a welcoming neighborhood spot inspired by the bright ingredients and generous traditions of the Mediterranean. Join us for a relaxed meal and a memorable moment.</p>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <a className="footer-brand" href="#home" aria-label="Little Lemon home"><span aria-hidden="true">🍋</span> Little Lemon</a>
          <p>Fresh Mediterranean moments, made with care.</p>
          <small>© {new Date().getFullYear()} Little Lemon. All rights reserved.</small>
        </div>
      </footer>
    </>
  );
}
