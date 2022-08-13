import React from 'react';

const CollectionList = ({ collections, collectionTitle }) => {
  if (!collections.length) {
    return <h3>No collections Yet</h3>;
  }

  return (
    <div>
      <h3>{collectionTitle}</h3>
      {collections &&
        collections.map((collections) => (
          <div key={collections._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {collections.collectionTitle} 
            </h4>
          </div>
        ))}
    </div>
  );
};

export default CollectionList;