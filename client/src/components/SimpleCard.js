import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';

import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  title: {
    fontSize: '1.5em',
    textDecoration: 'bold',
  },
  card: {
    width: '100%',
    marginBottom: 30,
  },
  pos: {
    marginTop: 5,
  },
  chip: {
    marginRight: 10,
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
        }
        title={<Link target="_new" href={props.url}>{props.title}</Link>}
        subheader={props.url}
        classes={{title: classes.title}}
      />
      <CardContent>
        {props.tags.map(tag => (
          <Chip key={tag.id} label={tag.name} className={classes.chip} />
        ))}
      </CardContent>
    </Card>
  );
}

SimpleCard.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};
