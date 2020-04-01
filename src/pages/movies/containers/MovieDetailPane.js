import React from 'react';
import { connect } from 'react-redux';
import { DetailPane } from '../../../components/organisms/DetailPane';
import { SmallHeader } from '../../../components/atoms/SmallHeader';
import { Overview } from '../../../components/atoms/Overview';
import { Icon } from '../../../components/atoms/Icon';
import { closeDetailPane } from '../modules/actions';
import isolang from '../../../assets/isolang.json';
import './MovieDetailPane.scss';

function mapStateToProps (state) {
  const { movieDetail, isLoadingMovieDetail } = state
  return {
    movieDetail,
    isLoadingMovieDetail
  }
}

function mapDispatchToPros (dispatch) {
  return {
    closeDetailPane () {
      dispatch(closeDetailPane())
    }
  }
}

function addCommas(arrData, key) {
  return arrData.map((data, ind) => {
    if (ind === arrData.length - 1) return data[key]
    return `${data[key]}, `
  })
}

function convertToHrsMins (min) {
  return `${Math.floor(min / 60)} hr, ${min % 60} min`
}

function convertToDollarNotation (num) {
  let dollars = '';
  while (num >= 1000) {
    let hundreds = num % 1000;
    if (hundreds === 0) hundreds = '000'
    dollars = `,${hundreds}${dollars}`;
    num = Math.floor(num / 1000);
  }
  dollars =`$${num}${dollars}`;
  return dollars;
}

const MovieDetailPaneContainer = ({ movieDetail, isLoadingMovieDetail, closeDetailPane }) => {
  if (isLoadingMovieDetail) {
    return (
      <DetailPane isSelected={isLoadingMovieDetail} closePane={closeDetailPane} >
        Loading...
      </DetailPane>
    )
  }
  if (!!movieDetail) {
    const { 
      title,
      homepage,
      overview,
      poster_path,
      tagline,
      genres,
      runtime,
      release_date,
      status,
      original_language,
      budget,
      revenue,
      production_companies,
    } = movieDetail;
    const language = isolang[original_language].name;

    return (
      <DetailPane isSelected={!!movieDetail} closePane={closeDetailPane} >
        <SmallHeader text={title} />
        <small>{homepage && <a href={homepage}>Official site</a>}</small>
        <Overview text={overview} />
        <figure className="detail-icon">
          <Icon src={`https://image.tmdb.org/t/p/w500/${poster_path}`} title={title} />
          <figcaption><i>{tagline}</i></figcaption>
        </figure>
        <ul className="detail-list">
          <li>
            <SmallHeader text="Genre:" />&nbsp;
            {
              addCommas(genres, 'name')
            }
          </li>
          {
            runtime ?
              <li>
                <SmallHeader text="Runtime:" />&nbsp;
                {
                  convertToHrsMins(runtime)
                }
              </li>
            : 
              null
          }
          <li>
            <SmallHeader text="Release date:" />&nbsp;
            {
              new Date(release_date).toString().split(' ').slice(1, 4).join(' ')
            }
          </li>
          <li>
            <SmallHeader text="Status:" />&nbsp;{status}
          </li>
          <li>
            <SmallHeader text="Language:" />&nbsp;{language}
          </li>
          <li>
            <SmallHeader text="Budget:" />&nbsp;{convertToDollarNotation(budget)}
          </li>
          <li>
            <SmallHeader text="Revenue:" />&nbsp;{convertToDollarNotation(revenue)}
          </li>
          <li>
            <SmallHeader text="Production Companies:" />&nbsp;
            {
              addCommas(production_companies, 'name')
            }
          </li>
        </ul>
      </DetailPane>
    )
  }
  return null;
}

export default connect(mapStateToProps, mapDispatchToPros)(MovieDetailPaneContainer)