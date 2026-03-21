export function validateStep(step, formData, medications) {
  const errors = {}

  if (step === 1) {
    if (!formData.firstName.trim()) errors.firstName = 'Please enter your first name.'
    if (!formData.lastName.trim()) errors.lastName = 'Please enter your last name.'
    if (!formData.dob) errors.dob = 'Please enter your date of birth.'
    if (!formData.phone.trim() || formData.phone.trim().length < 7)
      errors.phone = 'Please enter a valid phone number.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = 'Please enter a valid email address.'
  }

  if (step === 2) {
    const hasMed = medications.some(m => m.name.trim())
    if (!hasMed) errors._medications = 'Please add at least one medication.'
  }

  if (step === 3) {
    if (!formData.docName.trim()) errors.docName = "Please enter your doctor's name."
    if (!formData.docPhone.trim() || formData.docPhone.trim().length < 7)
      errors.docPhone = "Please enter your doctor's phone number."
  }

  if (step === 4) {
    if (!formData.street.trim()) errors.street = 'Please enter your street address.'
    if (!formData.city.trim()) errors.city = 'Please enter your city.'
    if (!formData.state) errors.state = 'Please select your district.'
    if (!/^\d{4,6}/.test(formData.zip.trim())) errors.zip = 'Please enter a valid postal code.'
    if (!formData.firstDelivery) errors.firstDelivery = 'Please select a start date.'
  }

  return errors
}
