import { useState, useRef, useEffect } from "react";
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
  Box,
  useToast,
} from "@chakra-ui/react";

export const EditEvent = ({
  isOpen,
  onClose,
  initialData,
  setEvent,
  categories,
  users,
}) => {
  const formRef = useRef(null);
  const toast = useToast();

  const [formData, setFormData] = useState({
    ...initialData,
    categoryIds: initialData.categoryIds || [],
  });

  //initialData prop to show form fields with event data when opened.
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  //Edit input handler
  const handleInputEditChange = (event) => {
    const { name, value } = event.target;

    if (name === "category") {
      // const categoryIdArray = value === "" ? [] : [parseInt(value, 10)];
      const categoryIdArray = value === "" ? [] : [value];

      setFormData((previousData) => ({
        ...previousData,
        categoryIds: categoryIdArray,
      }));
    } else {
      setFormData((previousData) => ({
        ...previousData,
        [name]: value,
      }));
    }
  };

  //Edit image upload - This won't fully work without Back-End Development.
  const handleImageEditChange = (event) => {
    const imageFile = event.target.files[0]; //retrieves first file selected by user. [0] for single file
    setFormData((previousData) => ({
      ...previousData,
      image: imageFile,
      userImage: imageFile,
    }));
  };
  //action - PUT (edit) / handle form Submit-Save /success-error message to user
  const processAction = async ({ request }) => {
    //make formData into object {key, value] and stringify.
    try {
      // const formDataObject = {};
      // for (const [key, value] of request.entries()) {
      //   formDataObject[key] = value;
      // }
      // const requestBody = JSON.stringify(formDataObject);
      const response = await fetch(
        `http://localhost:3000/events/${initialData.eventId}`,
        {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        setEvent(formData);
        toast({
          title: "Event Edited",
          description: "Your event has been successfuly edited!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        return { status: 200, json: { success: true } };
      } else {
        toast({
          title: "Error",
          description: "An Error occurred while editing the event",
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

  const handleUserEditChange = (event) => {
    const selectedUserId = event.target.value;

    setFormData((previousData) => ({
      ...previousData,
      userName: users.find((user) => user.id === selectedUserId)?.name || "",
      createdBy: selectedUserId,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form ref={formRef}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputEditChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Image</FormLabel>
              {/* /Event Image upload */}
              <Input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageEditChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Artists</FormLabel>
              <Input
                name="lineup"
                value={formData.lineup}
                onChange={handleInputEditChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={formData.description}
                onChange={handleInputEditChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputEditChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Start Time</FormLabel>
              <Input
                name="startTime"
                value={formData.startTime}
                onChange={handleInputEditChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>End Time</FormLabel>
              <Input
                name="endTime"
                value={formData.endTime}
                onChange={handleInputEditChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputEditChange}
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
              <Select
                name="userName"
                value={formData.createdBy}
                onChange={handleUserEditChange}
              >
                <option value="">Select user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
              {formData.createdBy && (
                <Box mt={2}>
                  <img
                    src={
                      users.find((user) => user.id === formData.createdBy)
                        ?.image
                    }
                    alt="User"
                    style={{ width: "50px", height: "50px" }}
                  />
                </Box>
              )}
            </FormControl>
            <FormControl>
              {/* /User Image upload */}
              <FormLabel>User Image</FormLabel>
              <Input
                name="userImage"
                type="file"
                onChange={handleImageEditChange}
              />
            </FormControl>
          </Form>
        </ModalBody>

        <ModalFooter>
          {/* Additional modal footer actions go here  */}
          <Button
            colorScheme="blue"
            mr={3}
            onClick={async () => {
              //Form data object ... apend updated data
              const updatedData = new FormData();

              updatedData.append("title", formData.title);
              updatedData.append("image", formData.image);
              updatedData.append("lineup", formData.lineup);
              updatedData.append("description", formData.description);
              updatedData.append("categoryIds", formData.categoryId);
              updatedData.append("location", formData.location);
              updatedData.append("startTime", formData.startTime);
              updatedData.append("endTime", formData.endTime);
              updatedData.append("userName", formData.userName);
              updatedData.append("userImage", formData.userImage);

              const result = await processAction({ request: updatedData });
              console.log("PUT request result:", result);
              //200=succeful save
              if (result.status === 200) {
                console.log("Event edited successful");
                onClose();
              } else {
                console.error("An error occurred:", result.json.error);
              }
            }}
          >
            Save
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditEvent;
