<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-4">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{ $t('view.signIn.title') }}</v-toolbar-title>
              </v-toolbar>
              <form @submit.prevent="validateBeforeSubmit" novalidate>
                <v-card-text>
                  <v-text-field
                    v-validate="'required|email'"
                    v-model="email"
                    :error-messages="errors.collect('email')"
                    prepend-icon="person"
                    name="email"
                    :label="$t('view.signIn.email')"
                    type="email"
                    autocomplete="username"
                    required
                    >
                  </v-text-field>
                  <v-text-field
                    v-validate="'required|min:8'"
                    v-model="password"
                    :error-messages="errors.collect('password')"
                    prepend-icon="lock"
                    name="password"
                    :label="$t('view.signIn.password')"
                    type="password"
                    autocomplete="current-password"
                    required
                    >
                  </v-text-field>
                </v-card-text>
                <v-alert
                  :value="!!errorCode"
                  type="error"
                >
                  {{ $t(`errorCode.${errorCode}`) }}
                </v-alert>
                <v-card-actions>
                  <v-btn flat @click="$router.push({ name: 'register' })">{{ $t('view.signIn.registrationButton') }}</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" type="submit" :disabled="inProcess">{{ $t('view.signIn.submitButton') }}</v-btn>
                </v-card-actions>
              </form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { State, Getter, Action } from 'vuex-class'
  import { ISignInInput } from '@mantissa/gql-types';

  @Component({})
  export default class SignInView extends Vue {
    @Action('signIn', { namespace: 'user' })
    private signIn!: (input: ISignInInput) => string;

    private email: string = '';
    private password: string = '';
    private errorCode: string = '';
    private inProcess: boolean  = false;

    private async validateBeforeSubmit(): Promise<void> {
      this.errorCode = '';

      const isValid = await this.$validator.validateAll();

      if (!isValid) {
        return;
      }

      try {
        this.inProcess = true;

        await this.signIn({
          email: this.email,
          password: this.password
        });
      } catch (errCode) {
        this.errorCode = errCode;
      }

      this.inProcess = false;

      this.$router.push({ name: 'operations' });
    }
  }
</script>
