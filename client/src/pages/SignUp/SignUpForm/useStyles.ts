import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  label: {
    fontSize: 19,
    color: 'rgb(0,0,0,0.4)',
    paddingLeft: '5px',
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    marginTop: 49,
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  inputLabel: {
    color: 'black',
    fontWeight: 600,
    textTransform: 'uppercase',
    fontSize: '0.8rem',
  },
}));

export default useStyles;
