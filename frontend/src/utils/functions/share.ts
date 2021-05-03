import { openPopup } from 'utils/functions/popup';

const share = (
  network,
  link = window.location.origin,
  title = '',
  description = '',
) => {
  const descriptionEncoded = encodeURIComponent(description);
  const titleEncoded = encodeURIComponent(title);
  const url = encodeURIComponent(link);
  let popup;

  if (network === 'facebook') {
    popup = `//www.facebook.com/sharer.php?u=${url}`;
  } else if (network === 'twitter') {
    popup = `//twitter.com/intent/tweet?text=${titleEncoded}&url=${url}`;
  } else if (network === 'linkedin') {
    popup = `//www.linkedin.com/shareArticle?mini=true&url=${url}&title=${titleEncoded}&summary=${descriptionEncoded}`;
  } else if (network === 'google') {
    popup = `//plus.google.com/share?url=${url}`;
  }

  if (popup) openPopup(popup);
};

export default {
  facebook: link => {
    share('facebook', link);
  },
  google: link => {
    share('google', link);
  },
  linkedin: (link, title, summary) => {
    share('linkedin', link, title, summary);
  },
  twitter: (link, text) => {
    share('twitter', link, text);
  },
};
