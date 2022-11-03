import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
//importing image uplaod components
import cuid from "cuid";
import Dropzone from "./dropZone";
import ImageGrid from "./imageGrid";

//importing api's
import {
  addRentalService,
  updateRentalService,
  uploadImage,
} from "../../../services/propertyServices";
//importing styles
import styles from "./styles.module.css";

//importing Formik
import * as Yup from "yup";
import { ErrorMessage, Formik } from "formik";

//importing MUI
import Grid from "@mui/material/Grid";

//importing other components
import Loader from "../../common/loader";
import TextFieldComponent from "../../common/textField";
import Button from "../../common/button";
import SelectFieldComponent from "../../common/selectField";
import TextAreaComponent from "../../common/textArea";
import CheckboxComponent from "./checkbox";

//importing actions
import { editProfile } from "../../../actions/userAction";
import { getModifyProperty } from "../../../actions/propertyAction";

//importing toastr
import { toast } from "react-toastify";

//importing constants
import { constants } from "../../../utils/constants";


const PropertyFields = ({ userState, editProfile, getModifyProperty }) => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (user._id && user.name && localStorage.getItem("authToken")) {
    } else {
      toast.error("Please Login!");
      navigate("/dashboard");
    }
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  // let initialValues = ;

  const [initialValues, setInitialValues] = useState({
    destination: "",
    subDestination: "",
    accommodation: "",
    price: "",
    houseType: "",
    overview: "",
    address: "",
    propertyName: "",
    streetName: "",
    district: "",
    state: "",
    amenities: [],
    originalImages: [],
  });
  const [renderFormik, setRenderFormik] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [subDestinations, setSubDestinations] = useState([]);
  const [addedImages, setAddedImages] = useState([]);

  const validate = Yup.object({
    destination: Yup.string().required("Destination is required"),
    subDestination: Yup.string().required("Sub-Destination is required"),
    accommodation: Yup.number()
      .min(1)
      .max(30)
      .required("Accommodation is required"),
    price: Yup.number().min(1).max(20000).required("Price is required"),
    houseType: Yup.string().required("House type is required"),
    overview: Yup.string().required("Overview is required"),
    address: Yup.string().required("Address is required"),
    propertyName: Yup.string().required("Property Name is required"),
    streetName: Yup.string().required("Street Name is required"),
    district: Yup.string().required("District is required"),
    state: Yup.string().required("State is required"),
    amenities: Yup.array()
      .min(1, "Amenities is required")
      .required("Amenities is required"),
  });

  const [images, setImages] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      
      if (addedImages.length + imagesToUpload.length + acceptedFiles.length > 5) {
        toast.error("Only 5 images are allowed");
        return;
      }
      acceptedFiles.map((file) => {
        setImagesToUpload((prev) => {
          
          return [...prev, file];
        });
        const reader = new FileReader();
        reader.onload = async function (e) {
          setImages((prevState) => [
            ...prevState,
            { id: cuid(), src: e.target.result },
          ]);
        };
        reader.readAsDataURL(file);
        return file;
      });
    },
    [imagesToUpload,addedImages]
  );

  const uploadImageHandler = async (file) => {
    const token = localStorage.getItem("authToken")
   let response = await uploadImage(file)
 
    if (
      response.status === "success" &&
      response.data[0] &&
      response.data[0].Location
    ) {
      return response.data[0].Location;
    }
  };

  const removeImageHandler = async (index) => {
    setImagesToUpload(
      imagesToUpload.filter((image, imageIndex) => imageIndex !== index)
    );
    setImages(images.filter((image, imageIndex) => imageIndex !== index));
  };

  useEffect(() => {
    if (params.id === "add") {
      setRenderFormik(true);
    } else {
      getModifyPropertyHandler();
    }
  }, []);

  // useEffect(() => {
  //   setRenderFormik(true)
  // }, [subDestinations])

  const getModifyPropertyHandler = async () => {
    let property = await getModifyProperty(params.id);
    if (property.status === "success" && property.data.rental) {
      let subDestinationsOptions = constants.SUB_DESTINATION_TYPES.filter(
        (subDestination) =>
          subDestination.destination === property.data.rental.destination
      ).map((subDestination) => subDestination.name);
      setSubDestinations(subDestinationsOptions);
      setInitialValues({
        ...initialValues,
        destination: property.data.rental.destination,
        subDestination: property.data.rental.subDestination,
        accommodation: property.data.rental.noOfPeopleAccomodate,
        price: property.data.rental.price,
        houseType: property.data.rental.houseType,
        overview: property.data.rental.overview,
        address: property.data.rental.address,
        propertyName: property.data.rental.rentalName,
        streetName: property.data.rental.streetName,
        district: property.data.rental.district,
        state: property.data.rental.state,
        amenities: property.data.rental.amenities,
      });
      setAddedImages(property.data.rental.originalImages);
      setRenderFormik(true);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true)
    if (addedImages + imagesToUpload.length < 1) {
      return;
    }
    let uploadedImages = [];
    for (let image of imagesToUpload) {
     
      uploadedImages.push(await uploadImageHandler(image));
    }
    values.originalImages = uploadedImages;
    values.thumbnailImages = uploadedImages;
    values.ownerId = user._id;
    values.rentalName = values.propertyName;
    delete values.propertyName;
    
    if (params.id === "add") {
      let response = await addRentalService({ ...values });
      setLoading(false)
      if(response.status==='success'){
        toast.success("Rental Added!")
        navigate('/properties')
      }
      else{
        toast.error("Failed to add Rental!")
      }
     
    } else {
    
    values.originalImages = [...addedImages,...values.originalImages];
    values.thumbnailImages = [...addedImages,...values.thumbnailImages];

    const updateRentalResponse = await updateRentalService({
      id: params.id,
      ...values,
    });
    setLoading(false)
    if(updateRentalResponse.status==='success'){
      toast.success("Rental Updated!")
      navigate('/properties')
    }
    else{
      toast.error("Failed to update Rental!")
    }

  }
   
  };

  return (
    <>
      {loading && <Loader />}
      <div className={styles["property-container"]}>
        <div className={styles["property-title"]}>
          {params.id === "add" ? "Add" : "Edit"} Property
        </div>

        {renderFormik && (
          <Formik
            initialValues={initialValues}
            validationSchema={validate}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {(form) => (
              <form
                onSubmit={form.handleSubmit}
                className={styles["input-container"]}
              >
                <Dropzone
                  onDrop={onDrop}
                  className={styles.dropzone}
                  disabled={addedImages.length+images.length >= 5}
                />

                <ImageGrid 
                removeImage={removeImageHandler} 
                images={images} 
                addedImage={addedImages}
                removeAddedImage={(index) =>
                  setAddedImages(addedImages.filter((addImageFilter,addImageFilterIndex)=>addImageFilterIndex!==index))}
                />
                {form.submitCount > 0 && addedImages.length+images.length < 1 && (
                  <div className={`${styles["error"]}`}>
                    Minimum 1 Image is required!
                  </div>
                )}
                <Grid container>
                  <Grid
                    className={styles["left-section"]}
                    item
                    md={12}
                    xs={12}
                    padding={0}
                  >
                    <label
                      className={`${styles["input-row"]} ${styles["flex-center"]}`}
                    >
                      <Grid container className={styles["item-container"]}>
                        <Grid
                          item
                          md={3}
                          xs={12}
                          padding={0}
                          className={`${styles["flex-center"]}`}
                        >
                          <span className={styles["input-title"]}>
                            Destination Type
                          </span>
                        </Grid>
                        <Grid item md={9} xs={12} padding={0}>
                          <SelectFieldComponent
                            id="destination-select"
                            name="destination"
                            placeholder="Destination Type..."
                            value={form.values["destination"]}
                            form={form}
                            className={`${styles["input-field"]} ${styles["select-field"]}`}
                            options={constants.DESTINATION_TYPES.map(
                              (destination) => destination.name
                            )}
                            onChange={(event) => {
                              form.setFieldValue(
                                "destination",
                                event.target.value
                              );
                              if (event.target.value != "") {
                                let subDestinationsOptions =
                                  constants.SUB_DESTINATION_TYPES.filter(
                                    (subDestination) =>
                                      subDestination.destination ===
                                      event.target.value
                                  ).map(
                                    (subDestination) => subDestination.name
                                  );
                                setSubDestinations(subDestinationsOptions);

                                // setSubDestinations(constants.SUB_DESTINATION_TYPES.map(
                                //   (subDestination) => {
                                //     if(subDestination.destination===form.values["destination"]){
                                //       return subDestination.name
                                //     }
                                //     }
                                // ))

                                return form.setFieldValue("subDestination", "");
                              }
                            }}
                          />
                        </Grid>
                      </Grid>
                    </label>
                    <label
                      className={`${styles["input-row"]} ${styles["flex-center"]}`}
                    >
                      <Grid container className={styles["item-container"]}>
                        <Grid
                          item
                          md={3}
                          xs={12}
                          padding={0}
                          className={`${styles["flex-center"]}`}
                        >
                          <span className={styles["input-title"]}>
                            Sub Destination
                          </span>
                        </Grid>
                        <Grid item md={9} xs={12} padding={0}>
                          <SelectFieldComponent
                            id="sub-destination-select"
                            name="subDestination"
                            placeholder="Sub Destination..."
                            value={form.values["subDestination"]}
                            form={form}
                            className={`${styles["input-field"]} ${styles["select-field"]}`}
                            options={subDestinations}
                          />
                        </Grid>
                      </Grid>
                    </label>

                    <label
                      className={`${styles["input-row"]} ${styles["flex-center"]}`}
                    >
                      <Grid container className={styles["item-container"]}>
                        <Grid
                          item
                          md={3}
                          xs={12}
                          padding={0}
                          className={`${styles["flex-center"]}`}
                        >
                          <span className={styles["input-title"]}>
                            House type
                          </span>
                        </Grid>
                        <Grid item md={9} xs={12} padding={0}>
                          <SelectFieldComponent
                            id="house-type-select"
                            name="houseType"
                            placeholder="House type..."
                            value={form.values["houseType"]}
                            form={form}
                            className={`${styles["input-field"]} ${styles["select-field"]}`}
                            options={constants.HOUSE_TYPES.map(
                              (destination) => destination.name
                            )}
                          />
                        </Grid>
                      </Grid>
                    </label>

                    <label
                      className={`${styles["input-row"]} ${styles["flex-center"]}`}
                    >
                      <Grid container className={styles["item-container"]}>
                        <Grid
                          item
                          md={3}
                          xs={12}
                          padding={0}
                          className={`${styles["flex-center"]}`}
                        >
                          <span className={styles["input-title"]}>
                            Accommodation for
                          </span>
                        </Grid>
                        <Grid item md={9} xs={12} padding={0}>
                          <TextFieldComponent
                            id="accommodation"
                            name="accommodation"
                            placeholder="Accommodation for"
                            width={500}
                            type={"number"}
                            inputProps={{
                              inputProps: {
                                max: 30,
                                min: 1,
                              },
                            }}
                            className={styles["input-field"]}
                          />
                        </Grid>
                      </Grid>
                    </label>

                    <label
                      className={`${styles["input-row"]} ${styles["flex-center"]}`}
                    >
                      <Grid container className={styles["item-container"]}>
                        <Grid
                          item
                          md={3}
                          xs={12}
                          padding={0}
                          className={`${styles["flex-center"]}`}
                        >
                          <span className={styles["input-title"]}>
                            Amenities
                          </span>
                        </Grid>
                        <Grid
                          item
                          md={9}
                          xs={12}
                          padding={0}
                          className={styles["amenities-container"]}
                        >
                          <Grid container className={styles["item-container"]}>
                            {constants.AMENITIES_LIST &&
                              constants.AMENITIES_LIST.map((list) => (
                                <React.Fragment key={list}>
                                  <Grid item xs={6} padding={0}>
                                    <CheckboxComponent
                                      label={list}
                                      name="amenities"
                                      form={form}
                                      onClick={() => {
                                        if (
                                          !form.values["amenities"].includes(
                                            list
                                          )
                                        ) {
                                          let tempValues = [
                                            ...form.values["amenities"],
                                            list,
                                          ];
                                          return form.setFieldValue(
                                            "amenities",
                                            tempValues
                                          );
                                        } else {
                                          let tempValues = [
                                            ...form.values["amenities"],
                                          ];
                                          tempValues.splice(
                                            tempValues.findIndex(
                                              (val) => val === list
                                            ),
                                            1
                                          );
                                          return form.setFieldValue(
                                            "amenities",
                                            tempValues
                                          );
                                        }
                                      }}
                                    />
                                  </Grid>
                                </React.Fragment>
                              ))}
                          </Grid>

                          <ErrorMessage
                            component="div"
                            name={"amenities"}
                            className={`${styles["error"]}`}
                          />
                        </Grid>
                      </Grid>
                    </label>

                    <label
                      className={`${styles["input-row"]} ${styles["flex-center"]}`}
                    >
                      <Grid container className={styles["item-container"]}>
                        <Grid
                          item
                          md={3}
                          xs={12}
                          padding={0}
                          className={`${styles["flex-center"]}`}
                        >
                          <span className={styles["input-title"]}>Price</span>
                        </Grid>
                        <Grid item md={9} xs={12} padding={0}>
                          <TextFieldComponent
                            id="price"
                            name="price"
                            placeholder="Price..."
                            width={500}
                            type={"number"}
                            inputProps={{
                              inputProps: {
                                max: 20000,
                                min: 1,
                              },
                            }}
                            className={styles["input-field"]}
                          />
                        </Grid>
                      </Grid>
                    </label>

                    <label
                      className={`${styles["input-row"]} ${styles["flex-center"]}`}
                    >
                      <Grid container className={styles["item-container"]}>
                        <Grid
                          item
                          md={3}
                          xs={12}
                          padding={0}
                          className={`${styles["flex-center"]}`}
                        >
                          <span className={styles["input-title"]}>
                            Property Name
                          </span>
                        </Grid>
                        <Grid item md={9} xs={12} padding={0}>
                          <TextFieldComponent
                            id="propertyName"
                            name="propertyName"
                            placeholder="Property Name..."
                            width={500}
                            type={"text"}
                            className={styles["input-field"]}
                          />
                        </Grid>
                      </Grid>
                    </label>
                    <label
                      className={`${styles["input-row"]} ${styles["flex-center"]}`}
                    >
                      <Grid container className={styles["item-container"]}>
                        <Grid
                          item
                          md={3}
                          xs={12}
                          padding={0}
                          className={`${styles["flex-center"]}`}
                        >
                          <span className={styles["input-title"]}>
                            Steet Name
                          </span>
                        </Grid>
                        <Grid item md={9} xs={12} padding={0}>
                          <TextFieldComponent
                            id="streetName"
                            name="streetName"
                            placeholder="Steet Name..."
                            width={500}
                            type={"text"}
                            className={styles["input-field"]}
                          />
                        </Grid>
                      </Grid>
                    </label>
                    <label
                      className={`${styles["input-row"]} ${styles["flex-center"]}`}
                    >
                      <Grid container className={styles["item-container"]}>
                        <Grid
                          item
                          md={3}
                          xs={12}
                          padding={0}
                          className={`${styles["flex-center"]}`}
                        >
                          <span className={styles["input-title"]}>
                            District
                          </span>
                        </Grid>
                        <Grid item md={9} xs={12} padding={0}>
                          <TextFieldComponent
                            id="district"
                            name="district"
                            placeholder="District..."
                            width={500}
                            type={"text"}
                            className={styles["input-field"]}
                          />
                        </Grid>
                      </Grid>
                    </label>
                    <label
                      className={`${styles["input-row"]} ${styles["flex-center"]}`}
                    >
                      <Grid container className={styles["item-container"]}>
                        <Grid
                          item
                          md={3}
                          xs={12}
                          padding={0}
                          className={`${styles["flex-center"]}`}
                        >
                          <span className={styles["input-title"]}>State</span>
                        </Grid>
                        <Grid item md={9} xs={12} padding={0}>
                          <TextFieldComponent
                            id="state"
                            name="state"
                            placeholder="State..."
                            width={500}
                            type={"text"}
                            className={styles["input-field"]}
                          />
                        </Grid>
                      </Grid>
                    </label>

                    <label
                      className={`${styles["input-row"]} ${styles["flex-center"]}`}
                    >
                      <Grid container className={styles["item-container"]}>
                        <Grid
                          item
                          md={3}
                          xs={12}
                          padding={0}
                          className={`${styles["flex-center"]}`}
                        >
                          <span className={styles["input-title"]}>
                            Overview
                          </span>
                        </Grid>
                        <Grid item md={9} xs={12} padding={0}>
                          <TextAreaComponent
                            id="overview"
                            name="overview"
                            placeholder="Overview..."
                            width={500}
                            lines={5}
                            className={`${styles["input-field"]} ${styles["overview-area"]}`}
                          />
                        </Grid>
                      </Grid>
                    </label>
                    <label
                      className={`${styles["input-row"]} ${styles["flex-center"]}`}
                    >
                      <Grid container className={styles["item-container"]}>
                        <Grid
                          item
                          md={3}
                          xs={12}
                          padding={0}
                          className={`${styles["flex-center"]}`}
                        >
                          <span className={styles["input-title"]}>Address</span>
                        </Grid>
                        <Grid item md={9} xs={12} padding={0}>
                          <TextAreaComponent
                            id="address"
                            name="address"
                            placeholder="Address..."
                            width={500}
                            lines={3}
                            className={`${styles["input-field"]} ${styles["overview-area"]}`}
                          />
                        </Grid>
                      </Grid>
                    </label>
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  type="submit"
                  className={styles["submit-button"]}
                >
                  {params.id === "add" ? "Add" : "Edit"}
                </Button>
              </form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  userState: state.userReducer,
});

export default connect(mapStateToProps, { editProfile, getModifyProperty })(
  PropertyFields
);
