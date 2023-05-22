import type React from 'react';
import type { ReactNode } from 'react';

export type FCWithChildren<T = {}> = React.FC<T & { children?: ReactNode }>;

export type ClosableType = {
  onClose: () => void;
  onOpen: () => void;
};

export interface GoogleLocation {
  lat: string;
  lng: string;
}

export interface GoogleViewport {
  northeast: GoogleLocation;
  southwest: GoogleLocation;
}

export interface Geometry {
  location: GoogleLocation;
  viewport: GoogleViewport;
}

export interface TextSearchResult {
  formatted_address: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  place_id: string;
  reference: string;
  types: string[];
}

export interface TextSearchResponseI {
  html_attributions: any[];
  results: TextSearchResult[];
  status: string;
}
