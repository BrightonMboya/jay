// YourForm.js
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const DestinationDetails = ({ control, register, remove, index }) => {
  return (
    <div key={index} className="mb-4 rounded border p-4">
      <h3 className="mb-2 text-xl font-semibold">Destination {index + 1}</h3>

      <label className="mb-2 block">Name:</label>
      <input
        {...register(`destinations.${index}.name`)}
        className="mb-2 w-full border p-2"
      />

      <label className="mb-2 block">Location:</label>
      <input
        {...register(`destinations.${index}.location`)}
        className="mb-2 w-full border p-2"
      />

      <label className="mb-2 block">Description:</label>
      <textarea
        {...register(`destinations.${index}.description`)}
        className="mb-2 w-full border p-2"
      />

      <label className="mb-2 block">Accommodation:</label>
      <input
        {...register(`destinations.${index}.accommodation`)}
        className="mb-2 w-full border p-2"
      />

      <button
        type="button"
        onClick={() => remove(index)}
        className="rounded bg-red-500 p-2 text-white"
      >
        Remove Destination
      </button>
    </div>
  );
};

const YourForm = () => {
  const { control, handleSubmit, register } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "destinations",
  });

  const onSubmit = (data) => {
    // Handle form submission, and send data to the database
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-8 max-w-xl">
      {/* Page 1: Basic Itinerary Info */}
      <div className="mb-4 rounded border p-4">
        <h2 className="mb-4 text-2xl font-semibold">
          Page 1: Basic Itinerary Info
        </h2>

        <label className="mb-2 block">Name:</label>
        <input {...register("name")} className="mb-2 w-full border p-2" />

        <label className="mb-2 block">Pricing:</label>
        <input {...register("pricing")} className="mb-2 w-full border p-2" />

        {/* Add more basic itinerary fields as needed */}
      </div>

      {/* Page 2: Destination Details */}
      <div className="mb-4 rounded border p-4">
        <h2 className="mb-4 text-2xl font-semibold">
          Page 2: Destination Details
        </h2>

        {fields.map((item, index) => (
          <DestinationDetails
            key={item.id}
            control={control}
            register={register}
            remove={remove}
            index={index}
          />
        ))}

        <button
          type="button"
          onClick={() => append({})}
          className="mb-2 rounded bg-blue-500 p-2 text-white"
        >
          Add Destination
        </button>
      </div>

      <hr />

      {/* Submit button */}
      <button type="submit" className="rounded bg-green-500 p-2 text-white">
        Submit
      </button>
    </form>
  );
};

export default YourForm;
