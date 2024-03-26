import {
  FormControl as MuiFormControl,
  FormControlProps as MuiFormControlProps,
} from '@mui/joy'
import { cnBase } from 'tailwind-variants'

export interface FormControlProps extends MuiFormControlProps {}

export const FormControl: React.FC<FormControlProps> = ({
  className,
  ...props
}) => {
  return <MuiFormControl className={cnBase(className)} {...props} />
}
