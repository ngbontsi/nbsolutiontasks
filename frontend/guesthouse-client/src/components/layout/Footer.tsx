import { RASMENI_CONTACT } from '../../data/mockProperties';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-section">
          <h3>Rasmeni & Sons</h3>
          <p>
            {RASMENI_CONTACT.address}
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', opacity: 0.8 }}>
            Hours: {RASMENI_CONTACT.hours}<br />
            After hours: {RASMENI_CONTACT.afterHours}
          </p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>WhatsApp Nikie: {RASMENI_CONTACT.whatsappNikie}</p>
          <p>WhatsApp Alex: {RASMENI_CONTACT.whatsappAlex}</p>
          <p>Landline: {RASMENI_CONTACT.landline}</p>
          <p>{RASMENI_CONTACT.emailPrimary}</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <p>Browse Rooms</p>
          <p>My Bookings</p>
          <p>Sign In to Book</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Rasmeni & Sons Guesthouse.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
