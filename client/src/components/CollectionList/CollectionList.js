import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { DELETE_COLLECTION } from "../../utils/mutations";
import { QUERY_USER_COLLECTIONS } from "../../utils/queries";
import Auth from "../../utils/auth";
// import { Mutation } from "react-apollo";

const CollectionList = ({ collections, collectionTitle }) => {
  const [deleteCollection, { error, data }] = useMutation(DELETE_COLLECTION, {
    variables: { collectionId: collections._id },
    onCompleted: (data) => {
      console.log(data);
      // this.setState({})
    },
  });
  
  const handleClick = (event) => {
    const {id} = event.target
    deleteCollection({ variables: {collectionId: id}})
  }

  if (!collections.length) {
    return <h3>No collections Yet</h3>;
  }

  return (
    <div>
      <h3>{collectionTitle}</h3>
      {collections &&
        collections.map((collection) => (
          <div key={collection._id}>
            <div
              className="card-header bg-primary text-light p-2 m-0"
              style={{ display: "flex" }}
            >
              {collection.collectionTitle}

              <button
                onClick={handleClick}
                className="btn btn-danger"
                style={{ marginLeft: "auto" }}
                id={collection._id}
              >
                X{" "}
              </button>
            </div>
            <p>- - - </p>
          </div>
        ))}
    </div>
  );
};

export default CollectionList;
