import React, { useState, useContext, useEffect } from "react";
import style from "./Form.module.css";
import { ListContext } from "../App";
import TextField from "@material-ui/core/TextField";

const Form = () => {
    const [inputField, setInputField] = useState({
        name: "",
        number: "",
        details: "",
    });

    const [error, setError] = useState({
        name: false,
        number: false,
        details: false,
    });

    const { comments, setComments, selected } = useContext(ListContext);

    const inputHandler = (event) => {
        setInputField({
            ...inputField,
            [event.target.name]: event.target.value,
        });
    };

    const submitButton = () => {
        if (
            inputField.name.length &&
            inputField.number.length &&
            inputField.details.length
        ) {
            if (comments.find((element) => element[selected.name])) {
                let tmp = comments.find((element) => element[selected.name]);
                tmp[selected.name].push(inputField);
                let tmpComments = [...comments];
                tmpComments[selected.name] = tmp;
                setComments(tmpComments);
            } else {
                let tmp = [...comments];
                tmp.push({ [selected.name]: [inputField] });
                setComments(tmp);
                if (comments.find((element) => element[selected.name])) {
                    let tmp = comments.find(
                        (element) => element[selected.name]
                    );
                    tmp[selected.name].push(inputField);
                    let tmpComments = [...comments];
                    tmpComments[selected.name] = tmp;
                    setComments(tmpComments);
                } else {
                    let tmp = [...comments];
                    tmp.push({ [selected.name]: [inputField] });
                    setComments(tmp);
                }
            }
            setInputField({ name: "", number: "", details: "" });
        } else {
            let nameError = false;
            let numberError = false;
            let detailsError = false;
            if (!inputField.name) {
                nameError = true;
            }
            if (!inputField.number) {
                numberError = true;
            }
            if (!inputField.details) {
                detailsError = true;
            }
            setError({
                name: nameError,
                number: numberError,
                details: detailsError,
            });
        }
    };

    useEffect(() => {
        setError({ name: false, number: false, details: false });
    }, [inputField]);

    return (
        <div className={style.container}>
            <div className={style.textBox}>
                <TextField
                    name={"name"}
                    error={error.name}
                    className={style.field}
                    label="Name"
                    value={inputField.name}
                    helperText={error.name === true && "Incorrect entry."}
                    onChange={inputHandler}
                />
            </div>
            <div className={style.textBox}>
                <TextField
                    name={"number"}
                    type={"number"}
                    error={error.number}
                    className={style.field}
                    label="Number of pokemon seen"
                    value={inputField.number}
                    helperText={error.number === true && "Incorrect entry."}
                    onChange={inputHandler}
                />
            </div>
            <div className={style.textBox}>
                <TextField
                    name={"details"}
                    error={error.details}
                    className={style.field}
                    label="Details"
                    value={inputField.details}
                    helperText={error.details === true && "Incorrect entry."}
                    onChange={inputHandler}
                    multiline={true}
                    maxRows={10}
                />
            </div>
            <div className={style.button} onClick={submitButton}>
                Submit
            </div>
        </div>
    );
};

export default Form;
