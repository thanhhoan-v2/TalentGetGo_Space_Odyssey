import DataLoader from 'dataloader';

import { getFromLocalUrl } from '@/api';
import { swapiPath } from '@/schema/constants';

// Define generic SWAPI API response type
interface SwapiApiResponse {
  properties?: Record<string, unknown>;
  result?: unknown[];
  results?: unknown[];
  next?: string | null;
  [key: string]: unknown;
}

const localUrlLoader = new DataLoader<string, SwapiApiResponse>((urls) =>
  Promise.all(urls.map((url) => getFromLocalUrl<SwapiApiResponse>(url)))
);

/**
 * Objects returned from SWAPI don't have an ID field, so add one.
 */
function objectWithId(obj: Record<string, any>): Record<string, any> {
  obj.id = parseInt(obj.url.split('/')[5], 10);
  return obj;
}

/**
 * Given an object URL, fetch it, append the ID to it, and return it.
 */
export async function getObjectFromUrl(
  url?: string | null
): Promise<Record<string, any> | null> {
  if (!url) {
    return null;
  }
  const data = await localUrlLoader.load(url);
  // some objects have a 'properties' field, others simply have the data
  return objectWithId(data.properties || data);
}

/**
 * Given a type and ID, get the object with the ID.
 */
export async function getObjectFromTypeAndId(
  type: string,
  id: string
): Promise<Record<string, any> | null> {
  return await getObjectFromUrl(`${swapiPath}/${type}/${id}`);
}

interface ObjectsByType {
  objects: Array<Record<string, any>>;
  totalCount: number;
}

/**
 * Given a type, fetch all of the pages, and join the objects together
 */
export async function getObjectsByType(type: string): Promise<ObjectsByType> {
  let objects: Array<Record<string, any>> = [];
  let nextUrl: string | null = `${swapiPath}/${type}`;
  while (nextUrl) {
     
    const pageData = await localUrlLoader.load(nextUrl);
    const results = pageData.result || pageData.results || [];
    objects = objects.concat(
      results.map((item: unknown) =>
        objectWithId((item as Record<string, unknown>).properties || item)
      )
    );
    nextUrl = pageData.next ?? null;
  }
  objects = sortObjectsById(objects);
  return { objects, totalCount: objects.length };
}

export async function getObjectsFromUrls(
  urls: string[]
): Promise<Array<Record<string, any>>> {
  const array = await Promise.all(urls.map(getObjectFromUrl));
  return sortObjectsById(
    array.filter((item): item is Record<string, any> => item !== null)
  );
}

function sortObjectsById(
  array: Array<Record<string, any>>
): Array<Record<string, any>> {
  return array.sort((a, b) => a.id - b.id);
}

/**
 * Given a string, convert it to a number
 */
export function convertToNumber(value: string): number | null {
  if (value === undefined || value === null) {
    return null;
  }
  if (['unknown', 'n/a'].indexOf(value) !== -1) {
    return null;
  }
  // remove digit grouping
  const numberString = value.replace(/,/, '');
  return Number(numberString);
}
