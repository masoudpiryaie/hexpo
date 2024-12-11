import React from 'react';
import { View, Button } from 'react-native';
import { useFormikContext } from 'formik';

const SubmitForm = () => {
    const { handleSubmit } = useFormikContext();

    return (
        <View>
            <Button title='Submit' onPress={handleSubmit} />
        </View>
    );
}

export default SubmitForm;