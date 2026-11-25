import { useMemo, useState } from 'react';

const TIMES = ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

function getToday() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  return new Date(today.getTime() - offset * 60000).toISOString().slice(0, 10);
}

export default function BookingForm({ onSubmit }) {
  const [values, setValues] = useState({
    date: getToday(),
    time: '',
    guests: '2',
    occasion: 'No special occasion',
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const minDate = useMemo(() => getToday(), []);

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }

  function validate() {
    const nextErrors = {};
    if (!values.date) nextErrors.date = 'Please choose a reservation date.';
    if (values.date && values.date < minDate) nextErrors.date = 'Please choose today or a future date.';
    if (!values.time) nextErrors.time = 'Please select a reservation time.';
    if (!values.guests) nextErrors.guests = 'Please select the number of guests.';
    if (!values.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!values.email.trim()) nextErrors.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Please enter a valid email address.';
    if (!values.phone.trim()) nextErrors.phone = 'Please enter your phone number.';
    else if (!/^[+()\d\s-]{7,20}$/.test(values.phone)) nextErrors.phone = 'Please enter a valid phone number.';
    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setSubmitted(true);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    onSubmit({
      ...values,
      guests: Number(values.guests),
      date: new Date(`${values.date}T12:00:00`).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      }),
    });
  }

  function errorFor(field) {
    return errors[field] ? <span className="field-error" id={`${field}-error`}>{errors[field]}</span> : null;
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <p className="eyebrow">Your table is waiting</p>
        <h2>Make a reservation</h2>
        <p>Fields marked with <span aria-hidden="true">*</span> are required.</p>
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="date">Choose a date <span aria-hidden="true">*</span></label>
          <input id="date" name="date" type="date" min={minDate} value={values.date} onChange={updateField} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? 'date-error' : undefined} required />
          {errorFor('date')}
        </div>
        <div className="field">
          <label htmlFor="time">Choose a time <span aria-hidden="true">*</span></label>
          <select id="time" name="time" value={values.time} onChange={updateField} aria-invalid={Boolean(errors.time)} aria-describedby={errors.time ? 'time-error' : undefined} required>
            <option value="">Select a time</option>
            {TIMES.map((time) => <option key={time} value={time}>{time}</option>)}
          </select>
          {errorFor('time')}
        </div>
        <div className="field">
          <label htmlFor="guests">Number of guests <span aria-hidden="true">*</span></label>
          <select id="guests" name="guests" value={values.guests} onChange={updateField} aria-invalid={Boolean(errors.guests)} aria-describedby={errors.guests ? 'guests-error' : undefined} required>
            {Array.from({ length: 10 }, (_, index) => index + 1).map((number) => <option key={number} value={number}>{number} {number === 1 ? 'guest' : 'guests'}</option>)}
          </select>
          {errorFor('guests')}
        </div>
        <div className="field">
          <label htmlFor="occasion">Occasion</label>
          <select id="occasion" name="occasion" value={values.occasion} onChange={updateField}>
            <option>No special occasion</option>
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>Business meal</option>
            <option>Other celebration</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="name">Full name <span aria-hidden="true">*</span></label>
          <input id="name" name="name" type="text" autoComplete="name" placeholder="Your name" value={values.name} onChange={updateField} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} required />
          {errorFor('name')}
        </div>
        <div className="field">
          <label htmlFor="email">Email address <span aria-hidden="true">*</span></label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={updateField} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} required />
          {errorFor('email')}
        </div>
        <div className="field field-full">
          <label htmlFor="phone">Phone number <span aria-hidden="true">*</span></label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 555 123 4567" value={values.phone} onChange={updateField} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} required />
          {errorFor('phone')}
        </div>
      </div>
      {submitted && Object.keys(errors).length > 0 && <p className="form-summary" role="alert">Please correct the highlighted fields before submitting your reservation.</p>}
      <button className="button button-primary full-width" type="submit">Confirm reservation</button>
      <p className="form-note">This demo shows an on-screen confirmation. It does not send a real booking to a restaurant.</p>
    </form>
  );
}
