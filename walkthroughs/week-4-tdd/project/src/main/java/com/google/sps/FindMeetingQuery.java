// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
      // Simple cases
      if (request.getAttendees().isEmpty() || request.getDuration() == 0) {
          return Arrays.asList(TimeRange.WHOLE_DAY);
      }

      // Scheduling
      ArrayList<TimeRange> available = new ArrayList<TimeRange>();
      
      int soFar = 0; 

      for (Event event : events) {
          boolean conflict = false; 
          for (String attendee : event.getAttendees()) {
              if (request.getAttendees().contains(attendee)) {
                  conflict = true; 
              }
          }
          if (conflict) {
              TimeRange range = event.getWhen();
              if (range.start() - soFar >= request.getDuration()) {
                  available.add(TimeRange.fromStartEnd(soFar, range.start(), false)); 
              }
              if (soFar <= range.end()) {
                  soFar = range.end(); 
              }   
          } 
      }

      if (TimeRange.END_OF_DAY - soFar >= request.getDuration()) {
          available.add(TimeRange.fromStartEnd(soFar, TimeRange.END_OF_DAY, true));
      }

      return available; 
  }
}
