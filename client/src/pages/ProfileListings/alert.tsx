import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

export default function Alert(props: AlertProps): JSX.Element {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
