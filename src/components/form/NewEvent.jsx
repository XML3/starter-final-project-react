import { useState, useRef } from "react";
import { Form } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react";

const NewEvent = ({ isOpen, onClose, onEventAdded, categories }) => {
  const formRef = useRef(null);
  //console.log(formRef.current);
  const toast = useToast();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    lineup: "",
    description: "",
    category: "",
    startTime: "",
    endTime: "",
    location: "",
    userName: "",
    userImage: "",
  });

  //input handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "category") {
      setFormData((previousData) => ({
        ...previousData,
        category: value,
      }));
    } else {
      setFormData((previousData) => ({
        ...previousData,
        [name]: value,
      }));
    }
  };

  //image upload handler-change (updates state when selected in the form)
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0]; //retrieves first file selected by user. [0] for single file
    setFormData((previousData) => ({
      ...previousData,
      image: imageFile,
      userImage: imageFile,
    }));
  };

  //action - POST / handle form Submit-Save /success-error message to user
  const takeAction = async () => {
    try {
      //const formData = new FormData(formRef.current);

      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("API Response:", response);
      if (response.ok) {
        //notify the user
        toast({
          title: "Event Created",
          description: "Your event has been successfuly created!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        return { status: 200, json: { success: true } };
      } else {
        toast({
          title: "Error",
          description: "An Error occurred while creting the event",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        const errorMessage = await response.text();
        return { status: response.status, json: { error: errorMessage } };
      }
    } catch (error) {
      return { status: 500, json: { error: "Internal Server Error" } };
    }
  };

  //function to reset data
  const resetForm = () => {
    setFormData({
      title: "",
      image: "",
      lineup: "",
      description: "",
      category: "",
      startTime: "",
      endTime: "",
      location: "",
      userName: "",
      userImage: "",
    });
  };
  //handle Save - takeAction - reset data
  const handleSaveClick = async () => {
    console.log("handleSaveClick called");

    //call takeAction to perform the POST request when Save is clicked
    const result = await takeAction();

    if (result.json.success) {
      // onEventAdded(formData);
      resetForm(); //clear form fields
      onClose();
    } else {
      console.error("Error submitting form:", result.json.error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="new-form" ref={formRef}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Image</FormLabel>
              {/* /Event Image upload */}
              <Input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Artists</FormLabel>
              <Input
                name="lineup"
                value={formData.lineup}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Start Time</FormLabel>
              <Input
                name="startTime"
                type="text"
                placeholder="Start Time"
                value={formData.startTime}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>End Time</FormLabel>
              <Input
                name="endTime"
                type="text"
                placeholder="End Time"
                value={formData.endTime}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              {/* User information */}
              <FormLabel>User Name</FormLabel>
              <Input
                name="userName"
                type="text"
                placeholder="User Name"
                value={formData.userName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              {/* /User Image upload */}
              <FormLabel>User Image</FormLabel>
              <Input
                name="userImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          {/* Additional modal footer actions  */}
          <Button
            form="new-form"
            colorScheme="blue"
            mr={3}
            onClick={handleSaveClick}
          >
            Save
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewEvent;
