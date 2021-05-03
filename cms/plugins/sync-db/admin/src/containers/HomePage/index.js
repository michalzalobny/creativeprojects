/*
 *
 * HomePage
 *
 */

import React, { memo } from "react";
import styled from "styled-components";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import axios from "axios";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 120px 0;
`;

const Button = styled.button`
  font-size: 16px;
  color: white;
  padding: 8px 38px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #9900e6;
  transition: 0.4s box-shadow;

  &:focus {
    outline: none;
    background-color: #dd99ff;
  }

  &:hover {
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
  }
`;

const InfoParagraph = styled.p`
  margin: 20px 0 0 0;
  color: black;
  text-align: center;
  font-size: 16px;
`;

const handleClick = () => {
  const requestUrl = `${strapi.backendURL}/sync-db`;
  axios.post(requestUrl).then((response) => {
    if (response.data.ok) {
      strapi.notification.success("notification.syncdb.success");
    } else {
      strapi.notification.error("notification.syncdb.error");
    }
  });
};

const HomePage = (props) => {
  return (
    <Wrapper>
      <Button onClick={() => handleClick()}>Sync DB</Button>
      <InfoParagraph>
        After you click the button, current database will be removed and
        re-initialized from `init.sql` file.
      </InfoParagraph>
    </Wrapper>
  );
};

export default memo(HomePage);
