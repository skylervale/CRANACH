<template>
  <v-row>
    <v-col cols="12" class="pa-2 mt-2">
      <v-hover v-slot:default="{ hover }" open-delay="100">
        <v-card
                :elevation="hover ? 10 : 0"
                :id="`production-${item.unique}`"
                class="pa-0"
                :style="`border: 3px solid ${item.color}`"
        >
          <v-img
                  :src="item.imageUrl"
                  height="250px"
                  position="center top"
                  class="pa-0"
                  :style="`background-color: ${item.color}`"
          />

          <v-card-text class="pa-0">
            <v-list>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-list-item-title v-on="on">{{ item.title }}</v-list-item-title>
                    </template>
                    <span>{{ item.title }}</span>
                  </v-tooltip>
                  <v-list-item-subtitle>
                    <v-divider></v-divider>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line >
                <v-list-item-content>
                  <v-list-item-title>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon
                                :color="item.color"
                                alt="Künstler"
                                v-on="on"
                        >
                          fa-globe-europe
                        </v-icon>
                      </template>
                      <span>Aufbewahrungsort</span>
                    </v-tooltip>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-list-item-title v-on="on">{{ item.location }}</v-list-item-title>
                      </template>
                      <span>{{ item.location }}</span>
                    </v-tooltip>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content class="pl-1">
                  <v-list-item-title>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon
                                :color="item.color"
                                alt="Künstler"
                                v-on="on"
                        >
                          fa-hand-holding-usd
                        </v-icon>
                      </template>
                      <span>Auftraggeber</span>
                    </v-tooltip>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-list-item-title v-on="on">{{ item.customer }}</v-list-item-title>
                      </template>
                      <span>{{ item.customer }}</span>
                    </v-tooltip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item three-line >
                <v-list-item-content>
                  <v-list-item-title>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon
                                :color="item.color"
                                alt="Künstler"
                                v-on="on"
                        >
                          fa-mortar-pestle
                        </v-icon>
                      </template>
                      <span>Medium</span>
                    </v-tooltip>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-list-item-title v-on="on">{{ item.medium }}</v-list-item-title>
                      </template>
                      <span>{{ item.medium }}</span>
                    </v-tooltip>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content class="pl-1">
                  <v-list-item-title>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon
                                :color="item.color"
                                alt="Künstler"
                                v-on="on"
                        >
                          fa-ruler-combined
                        </v-icon>
                      </template>
                      <span>Größe</span>
                    </v-tooltip>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-list-item-title v-on="on">{{ item.dimensions }}</v-list-item-title>
                      </template>
                      <span>{{ item.dimensions }}</span>
                    </v-tooltip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line >
                <v-list-item-content>
                  <v-list-item-title>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon
                                :color="item.color"
                                alt="Künstler"
                                v-on="on"
                        >
                          fa-calendar-alt
                        </v-icon>
                      </template>
                      <span>Entstehungszeit</span>
                    </v-tooltip>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-list-item-title v-on="on">
                          {{ item.date || 'k.A.' }}
                        </v-list-item-title>
                      </template>
                      <span>{{ item.date || 'k.A.' }}</span>
                    </v-tooltip>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content class="pl-1">
                  <v-list-item-title>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon
                                :color="item.color"
                                alt="Künstler"
                                v-on="on"
                        >
                          fa-fingerprint
                        </v-icon>
                      </template>
                      <span>Künstler</span>
                    </v-tooltip>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-list-item-title v-on="on">{{ item.artist }}</v-list-item-title>
                      </template>
                      <span>{{ item.artist }}</span>
                    </v-tooltip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: "GalleryItem",
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>
