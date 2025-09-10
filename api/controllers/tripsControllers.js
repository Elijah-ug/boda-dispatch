export const addTrip = async (req, res) => {
  try {
    console.log("We gat the data");
    res.status(200).json({ message: "We gochu" });
  } catch (error) {
    console.log(error.message);
  }
};

export const getTrip = async (req, res) => {
  try {
    console.log("We gat the data");
    res.status(200).json({ message: "We gochu" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTrip = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
};
