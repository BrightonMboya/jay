import React, { useState } from "react";

const ItineraryForm = () => {
  const [itinerary, setItinerary] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    accommodation: "",
    activities: "",
    transport: "",
    notes: "",
  });

  const handleChange = (e) => {
    setItinerary({ ...itinerary, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(itinerary); // Here you would handle the form submission.
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg p-4">
      <div className="mb-4">
        <label
          htmlFor="destination"
          className="mb-2 block text-sm font-bold text-gray-700"
        >
          Destination
        </label>
        <input
          type="text"
          name="destination"
          className="w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow"
          onChange={handleChange}
        />
      </div>
      {/* Repeat for other fields, e.g., startDate, endDate, accommodation... */}
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Save Itinerary
      </button>
    </form>
  );
};

export default ItineraryForm;
