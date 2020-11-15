import React from 'react';
import { at } from 'lodash';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';

export function InputField(props) {
    const { errorText, ...rest } = props;
    const [field, meta] = useField(props);

    function _renderHelperText() {
        const [touched, error] = at(meta, 'touched', 'error');
        if (touched && error) {
            return error;
        }
    }

    return (
        <TextField
            //type="text"
            variant={'outlined'}
            error={meta.touched && meta.error && true}
            helperText={_renderHelperText()}
            {...field}
            {...rest}
        />
    );
}


