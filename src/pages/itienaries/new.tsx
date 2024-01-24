import React, { useState } from "react";
import Layout from "~/components/Layout/Layout";
import ItienaryHeaderForm from "~/components/itienary/ItienaryHeaderForm";

const ItineraryForm = () => {
  return (
    <Layout>
      <main>
        <ItienaryHeaderForm />
      </main>
    </Layout>
  );
};

export default ItineraryForm;
