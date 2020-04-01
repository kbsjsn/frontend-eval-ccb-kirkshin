import React from 'react';
import { connect } from 'react-redux';
import { DetailPane } from '../../../components/organisms/DetailPane';
import { SmallHeader } from '../../../components/atoms/SmallHeader';
import { Overiew } from '../../../components/atoms/Overview';
import { Icon } from '../../../components/atoms/Icon';
import { closeDetailPane } from '../modules/actions';
import isolang from '../../../assets/isolang.json';

function mapStateToProps (state) {
  const { selectedMovie } = state
  return {
    selectedMovie
  }
}

function mapDispatchToPros (dispatch) {
  return {
    closeDetailPane () {
      dispatch(closeDetailPane())
    }
  }
}

const MovieDetailPaneContainer = ({ selectedMovie, closeDetailPane }) => {
  if (!!selectedMovie) {
    const { 
      title,
      overview,
      poster_path,
      original_language,
      release_date
    } = selectedMovie;
    const language = isolang[original_language].name;

    return (
      <DetailPane isSelected={!!selectedMovie} closePane={closeDetailPane} >
        <SmallHeader text={title} />
        <Overiew text={overview} />
        <Icon src={`https://image.tmdb.org/t/p/w500/${poster_path}`} title={title} />
        <ul>
          <li>
            <SmallHeader text={'Release date'} />: {release_date}
          </li>
          <li>
          <SmallHeader text={'Genre'} />
          </li>
          <li>
            <SmallHeader text={'Language'} />: {language}
          </li>
        </ul>
      </DetailPane>
    )
  }
  return null;
}

export default connect(mapStateToProps, mapDispatchToPros)(MovieDetailPaneContainer)