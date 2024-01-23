import React, { useState } from "react";
import Layout from "~/components/Layout/Layout";
import ItienaryPage from "~/components/itienary/ItienaryPage";

const ItineraryForm = () => {
  return (
    <Layout>
      <main>
        <ItienaryPage />
      </main>
    </Layout>
  );
};

export default ItineraryForm;
