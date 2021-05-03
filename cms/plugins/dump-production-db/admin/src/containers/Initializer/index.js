/**
 *
 * Initializer
 *
 */

import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import pluginId from "../../pluginId";

const Initializer = (props) => {
  const ref = useRef();
  ref.current = props.updatePlugin;

  useEffect(() => {
    // Don't render component on production environment
    if (!strapi.remoteURL.includes("localhost")) {
      ref.current(pluginId, "preventComponentRendering", true);
    }

    ref.current(pluginId, "isReady", true);
  }, []);

  return null;
};

Initializer.propTypes = {
  updatePlugin: PropTypes.func.isRequired,
};

export default Initializer;
