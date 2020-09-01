import { ErrorState, AppError } from './../../types/error.d';
import { ADD_ERROR, ErrorsActionType } from '../actions/errors-actions';

const initialState: AppError[] = [];

export function errors(state = initialState, action: ErrorsActionType): ErrorState {
    switch (action.type) {
        case ADD_ERROR:
            return [...state, action.error];
        default:
            return state; 
    }
}
