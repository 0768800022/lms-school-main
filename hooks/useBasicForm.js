import { isArray } from "lodash";

import { useForm } from "@/components/Common/Form";

const useBasicForm = ({
    onSubmit,
    setIsChangedFormValues,
    onResetForm,
    override,
    otherData,
    validateFields,
} = {}) => {
    const [ form ] = useForm();
    const getFieldValue = (fieldName) => {
        if (form) return form.getFieldValue(fieldName);
        return "";
    };

    const setFieldValue = (fieldName, value) => {
        form.setFieldValue({ [fieldName]: value });
    };

    const handleSubmit = (formValues) => {
        onSubmit(
            {
                ...formValues,
                ...otherData,
            },
            mixinFuncs.handleValidateFields,
        );
    };

    const handleCallBackAfterSubmitForm = ({ response }) => {
        const { data } = response;
        let errorField = [];
        if (!data?.result && data?.data?.length > 0) {
            errorField = data?.data?.map((err) => ({ name: err.field, errors: [ err.message ] }));
            form.setFields(errorField);
        }
    };

    const handleValidateFields = ({ response: { data } }) => {
        if (!isArray(data)) {
            // errorField = data?.data?.map((err) => ({ name: err.field, errors: [ err.message ] }));
            // form.setFields(errorField);
            validateFields.map((field) => {
                if (field.message.code === data.code)
                    form.setFields([ { name: field.name, errors: [ field.message.message ] } ]);
            });
        }
    };

    const handleReset = () => {
        form.resetFields();
        if (onResetForm) onResetForm(form);
    };

    const onValuesChange = () => {
        setIsChangedFormValues(true);
    };

    const overrideHandler = () => {
        const centralizedHandler = {
            handleSubmit,
            handleReset,
            handleCallBackAfterSubmitForm,
            handleValidateFields,
            // changeFilter: override?.changeFilter ?? changeFilter,
        };
        override?.(centralizedHandler);
        return centralizedHandler;
    };

    const mixinFuncs = overrideHandler();

    return {
        getFieldValue,
        setFieldValue,
        form,
        mixinFuncs,
        onValuesChange,
    };
};

export default useBasicForm;
