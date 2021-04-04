import React, { useEffect, useState } from 'react';

interface LightniteAsset {
  liquidId: string;
  _id: string;
  name: string;
  image: string;
}


interface Props {
  hash: string;
}

const LightniteCard: React.FC<Props> = ({ hash }) => {

  const [asset, setAsset] = useState<LightniteAsset>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://backend.lightnite.io/assets/?filter=' + hash);
        const json = await response.json();
        const asset: LightniteAsset = json && json.success && json.data.length === 1 && json.data[0];
        setAsset(asset);
        setIsLoaded(true)
      } catch (err) {
        console.error(err)
      }
    })();
  }, []);

  return (
    <div className="card" >
      <div className="card__header">
        <div className="avatar">
          <img
            className="avatar__photo"
            src="https://lightnite.io/assets/img/utils/zap.png"
          />
          <div className="avatar__intro">
            <h4 className="avatar__name">{isLoaded ? asset.name : 'Unknown'}</h4>
            <small className="avatar__subtitle">
              Lightnite.io
            </small>
          </div>
        </div>
      </div>
      <div className="card__image">
        {
          isLoaded && <img
            src={`https:${asset.image}poster.png`}
            alt="Image alt text"
            title="Logo Title Text 1"
          />
        }
      </div>
      <div className="card__footer">
        {
          isLoaded && <button
            className="button button--primary"
            onClick={() => openInNewTab(`https://explorer.lightnite.io/${asset._id}`)}
          >
            Open in Explorer
          </button>
        }
      </div>
    </div >
  );
}


const openInNewTab = url => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};




export default LightniteCard;