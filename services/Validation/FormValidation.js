export const validateName = (name) => {
  if (!name) {
    return "نام  خود را وارد کنید";
  } else {
    return null;
  }
};
export const validateFamilyName = (familyName) => {
  if (!familyName) {
    return "نام خانوادگی خود را وارد کنید";
  } else {
    return null;
  }
};

export const validateIDNumber = (idNumber) => {
  if (!idNumber || idNumber.length == 10 || isNaN(idNumber)) {
    return "کد ملی باید ۱۰ رقمی باشد و فقط شامل اعداد باشد";
  }
  return null;
};

// Validate Agent ID Number
export const validatePassword = (password) => {
  if (!password) {
    return "پسورد را وارد کنید";
  }
  if (password.length <= 7) {
    return "پسورد باید بیشتر از ۸ کاراکتر باشد";
  }
  if (!/[a-z]/.test(password)) {
    return "پسورد باید شامل حروف کوچک باشد";
  }
  if (!/[A-Z]/.test(password)) {
    return "پسورد باید شامل حروف بزرگ باشد";
  }
  return "";
};

export const validateReTypePassword = (reTypePassword, password) => {
  console.log("password", password);
  console.log("reTypePassword", reTypePassword);
  if (!reTypePassword) {
    return "لطفاً پسورد را تکرار کنید";
  }
  if (reTypePassword !== password) {
    return "پسوردها مطابقت ندارند";
  }
  return null;
};

export const validateAgentName = (name) => {
  if (!name) {
    return "نام  خود را وارد کنید";
  } else {
    return null;
  }
};

export const validateAgentFamilyName = (agentFamilyName) => {
  if (!agentFamilyName) {
    return "نام خود را وارد کنید";
  } else {
    return null;
  }
};
export const validateAgentIdNumber = (agentIdNumber) => {
  if (!agentIdNumber || agentIdNumber.length == 10 || isNaN(agentIdNumber)) {
    return "کد ملی باید ۱۰ رقمی باشد و فقط شامل اعداد باشد";
  }
  return null;
};

export const validateCompanyName = (companyName) => {
  if (!companyName) {
    return "این فیلد الزامی است";
  } else {
    return null;
  }
};
export const validateCompanyIdNumber = (companyIdNumber) => {
  if (!companyIdNumber) {
    return "شناسه ملی را وارد کنید";
  } else {
    return null;
  }
};
export const validateNameFamily = (nameFamily) => {
  if (!nameFamily) {
    return "نام و نام خانوادگی را وارد کنید";
  } else {
    return null;
  }
};
export const validatelegalPhoneNumber = (legalphoneNumber) => {
  if (
    (legalphoneNumber.startsWith("09") && legalphoneNumber.length === 11) ||
    isNaN(legalphoneNumber)
  ) {
    return "شماره موبایل را به درستی وارد کنید";
  }
  return null;
};
