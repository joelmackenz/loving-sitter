import { Component, ErrorInfo, ReactNode } from 'react';

import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';

const styles = () =>
  createStyles({
    errorImageOverlay: {
      height: '60vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorImageContainer: {
      display: 'inline-block',
      backgroundImage: 'url("https://i.imgur.com/yW2W9SC.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '40vh',
      height: '40vh',
    },
    errorImageText: {
      fontSize: '28px',
      color: '#f04040',
    },
  });

interface Props {
  children: ReactNode;
}

type WrapperProps = Props & WithStyles<typeof styles>;

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<WrapperProps, State> {
  public state: State = {
    hasError: false,
  };
  // eslint-disable-next-line
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { classes } = this.props;
    if (this.state.hasError) {
      return (
        <div className={classes.errorImageOverlay}>
          <div className={classes.errorImageContainer}></div>
          <h2 className={classes.errorImageText}>Sorry, This Page is Broken. Please refresh the page.</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withStyles(styles)(ErrorBoundary);
