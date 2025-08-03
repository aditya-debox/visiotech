import React from 'react';
import { gql } from "graphql-request";
import client from '@/utils/graphqlClient';
import BrandCards from '@/components/brand/brandcards';

interface IBrandData {
    heading: string;
    slug : string;
    shortDescription: {
        text : string;
        html : string;
        raw : any
    }
     brandImage:{
    url:string
    }
    brandImageBlurhash:string;
    title: string
    highlights:{
    text : string;
    html : string;
    raw : any
    }
    useCase: {
        text : string;
        html : string;
        raw : any
    }
    project: {
        title : string;
        description : string
    }
}

export default async function Brand() {
    const query = gql`
        query GetBrands {
      brands {
        heading
        slug
        shortDescription{
          text
          html
          raw
        }
        brandImage{
          url
        }
        brandImageBlurhash
        title
        highlights{
          text
          html
          raw
        }
        useCase{
          text
          html
          raw
        }
        project{
          title
          description
        }
      }
    }
    `

      const response = await client.request<{brands : IBrandData[] }>(query)
      const brandsdata = response.brands
    if (! brandsdata) {
        console.log('No data found')
        }

    return (
    <div>
         <BrandCards brands={brandsdata} />
    </div>
    );

}

  
    
