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

const DumpButton = styled.button`
  font-size: 16px;
  color: white;
  padding: 8px 38px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #005ce6;
  transition: 0.4s box-shadow;

  &:focus {
    outline: none;
    background-color: #80b3ff;
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
  const requestUrl = `${strapi.backendURL}/dump-db`;
  axios.post(requestUrl).then((response) => {
    if (response.data.ok) {
      strapi.notification.success("notification.dbdump.success");
    } else {
      strapi.notification.error("notification.dbdump.error");
    }
  });
};

const HomePage = (props) => {
  return (
    <Wrapper>
      <DumpButton onClick={() => handleClick()}>Dump DB</DumpButton>
      <InfoParagraph>
        After you click the button, current database will be dumped and saved to
        `init.sql` file.
      </InfoParagraph>
    </Wrapper>
  );
};

export default memo(HomePage);
