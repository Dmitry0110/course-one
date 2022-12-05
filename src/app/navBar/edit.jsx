import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { validator } from "../utils/validator";
import api from "../api";
import RadioField from "../components/common/form/radioField";
import TextField from "../components/common/form/textField";
import SelectField from "../components/common/form/selectField";
import MultiSelectField from "../components/common/form/multiSelectField";
import BackHistoryButton from "../components/common/backButton";

const Edit = () => {
    const history = useHistory();
    const { userId } = useParams();

    // const handleSaveUser = () => {
    //     history.push(`/users/${data._id}`);
    // };

    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [qualities, setQualities] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
        api.users.getById(userId).then(({ profession, qualities, ...rest }) => {
            setData((prevState) => ({
                ...prevState,
                ...rest,
                profession: profession._id,
                qualities: transformQualities(qualities)
            }));
        });
    }, []);

    const transformQualities = (data) =>
        data.map((el) => ({ label: el.name, value: el._id }));

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: { message: "Name обязателен для заполнения" }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then(() => history.push(`/users/${userId}`));
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    return (
        <div className="container mt-5">
            <BackHistoryButton />

            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {data && professions.length > 0 ? (
                        <>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />

                                <SelectField
                                    label="Выберите вашу профессию"
                                    defaultOption="Choose..."
                                    options={professions}
                                    onChange={handleChange}
                                    value={data.profession}
                                    error={errors.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    options={qualities}
                                    onChange={handleChange}
                                    defaultValue={data.qualities}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />

                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Submit
                                </button>
                            </form>
                        </>
                    ) : (
                        <h3>loading...</h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Edit;
