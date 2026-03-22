export function validateStep(step, formData, medications) {
  const errors = {}

  if (step === 1) {
    if (!formData.firstName.trim()) errors.firstName = 'Please enter your first name.'
    if (!formData.lastName.trim()) errors.lastName = 'Please enter your last name.'
    if (!formData.dob) errors.dob = 'Please enter your date of birth.'
    if (!/^(98|97|96)\d{8}$/.test(formData.phone.trim()))
      errors.phone = 'Please enter a valid Nepali mobile number (e.g. 98XXXXXXXX).'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = 'Please enter a valid email address.'
  }

  if (step === 2) {
    const hasMed = medications.some(m => m.name.trim())
    if (!hasMed) errors._medications = 'Please add at least one medication.'
  }

  if (step === 3) {
    if (!formData.street.trim()) errors.street = 'Please enter your address.'
    if (!formData.city.trim()) errors.city = 'Please enter your city.'
    if (!formData.firstDelivery) errors.firstDelivery = 'Please select a start date.'
  }

  return errors
}