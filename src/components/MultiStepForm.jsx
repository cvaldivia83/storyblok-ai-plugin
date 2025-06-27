import { StoryblokComponent } from "@storyblok/react";
import { Box } from '@mui/material';
import React from 'react';


const MultiStepForm = ({ blok }) => {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [formData, setFormData] = React.useState({
    business_name: '',
    industry: '',
    persona: '',
    products: '',
    differentiator: '',
    product_description: '',
    image: '',
    budget: 0,
  });

  const currentStep = blok.steps[stepIndex];

  const goNext = () => setStepIndex((i) => i + 1);

  const goBack = () => setStepIndex((i) => i - 1);

  console.log(blok);
  return (
    <Box padding={4} >
      <StoryblokComponent
        blok={currentStep}
        formData={formData}
        setFormData={setFormData}
        onNext={goNext}
        onBack={goBack} />
    </Box>
  )
}

export default MultiStepForm;