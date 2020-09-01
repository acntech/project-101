import { AppError } from '../../types/error';

export const ADD_ERROR = 'ADD_ERROR';

interface AddErrorAction {
    type: typeof ADD_ERROR;
    error: AppError;
}

export type ErrorsActionType = AddErrorAction;

export const addErrorSuccess = (error: AppError): AddErrorAction => ({
    type: ADD_ERROR,
    error
});
