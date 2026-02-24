import React from 'react';
import {
  Helmet, withModulesManager, withHistory, withTooltip, formatMessage, historyPush,
} from '@openimis/fe-core';
import { injectIntl } from 'react-intl';
import { withTheme, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { RIGHT_INDIVIDUAL_CREATE, RIGHT_INDIVIDUAL_SEARCH } from '../constants';
import IndividualSearcher from '../components/IndividualSearcher';

const styles = (theme) => ({
  page: theme.page,
  fab: theme.fab,
});

function IndividualsPage(props) {
  const {
    intl, classes, rights, modulesManager, history,
  } = props;

  const onAdd = () => historyPush(modulesManager, history, 'individual.route.individual');
  console.log('here individuals page');
  return (
    rights.includes(RIGHT_INDIVIDUAL_SEARCH) && (
      <div className={classes.page}>
        <Helmet title={formatMessage(intl, 'individual', 'individuals.pageTitle')} />
        <IndividualSearcher rights={rights} isModalEnrollment={false} />
        {rights.includes(RIGHT_INDIVIDUAL_CREATE)
          && withTooltip(
            <div className={classes.fab}>
              <Fab color="primary" onClick={onAdd}>
                <AddIcon />
              </Fab>
            </div>,
            formatMessage(intl, 'individual', 'individual.create.tooltip'),
          )}
      </div>
    )
  );
}

const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export default withModulesManager(withHistory(injectIntl(withTheme(withStyles(styles)(connect(mapStateToProps)(IndividualsPage))))));
