export const signIn = async (email, password) => {
  try {
    const response = await fetch("http://localhost:3006/routes/users/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.error(error);
  }
};

export const signUp = async (newUser) => {
  try {
    const response = await fetch(
      "http://localhost:3006/routes/users/register",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.error(error);
  }
};
