import React, { useState } from "react";
import Layout from "~/components/Layout/Layout";
import ItienaryPage from "~/components/itienary/ItienaryPage";
import ItienaryHeaderForm from "~/components/itienary/ItienaryHeaderForm";

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
